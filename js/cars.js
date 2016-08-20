/**
 * Knockout ViewModel for Cars
 * 
 * @class
 */
var CarsViewModel =  function () {
    
    var self = this;
    var dreamCars = [
        {
            make: "Aston Martin",
            model: "DB9"
        },
        {
            make: "Lotus",
            model: "Elise"
        },
        {
            make: "Maserati",
            model: "Quattroporte"
        },
        {
            make: "Porsche",
            model: "Panamera"
        },
        {
            make: "Aston Martin",
            model: "Vanquish"
        },
        {
            make: "Maserati",
            model: "GranTurismo"
        },
        {
            make: "Maserati",
            model: "GranCabrio"
        },
        {
            make: "Lotus",
            model: "Exige"
        },
        {
            make: "Aston Martin",
            model: "Vantage"
        },
        {
            make: "Porsche",
            model: "911"
        },
        {
            make: "Bugatti",
            model: "Veyron"
        },
        {
            make: "Bugatti",
            model: "Galibier"
        },
        {
            make: "Lotus",
            model: "Evora"
        },
        {
            make: "Lotus",
            model: "2-eleven"
        }
    ];
    
    
    self.allCars = ko.observableArray([]);
    
    self.selectedCar = ko.observable();
    
    self.dreamCars = ko.observableArray([]);
    
    
    /**
     * Set allCars observable up
     */
    self.initialize = function () {
        self.allCars(self.setupCars());
    };
    
    /**
     * Build a working collection of makers and models
     * 
     * @returns {array} result 
     */
    self.setupCars = function () {
        var vehicles = self.sortAndGroupDreamCars();
        var result = [];
        
        // [{make: "Porche", models: ["911", "Panamera"] }]
        _.each(vehicles, function (cars, maker) {
            var index = {
                make: maker,
                models: ko.observableArray(cars)
            };
            cars.sort(self.sortByModel);
            result.push(index);
        });
        
        return result;
    };
    
    /**
     * Friendly format of wish list
     * 
     * @param {object} car 
     * @returns {string} 
     */
    self.formatText = function (car) {
        return car.make + " " + car.model;
    };
    
    /**
     * Add car to wish list
     * 
     * @returns {null}
     */
    self.addCar = function () {
        var selected = self.selectedCar();
        var allCars = self.allCars();
        var maker;
        
        if (selected) {
            maker = _.findWhere(allCars, { make: selected.make });
            maker.models.remove(selected);
            self.dreamCars.push(selected);
            self.selectNextCar(maker);
        }
        
    };
    
    /**
     * Removes car from wish list
     * 
     * @returns {null}
     */
    self.removeCar = function (car) {
        var allCars = self.allCars();
        var maker;
        
        if (car) {
            maker = _.findWhere(allCars, { make: car.make });
            maker.models.push(car);
            maker.models.sort(self.sortByModel);
            self.dreamCars.remove(car);
            self.selectedCar(car);
        }
    };
    
    /**
     * Sort and Group DreamCars by "make"
     * 
     * @returns {object} grouped 
     */
    self.sortAndGroupDreamCars = function () {
        var grouped;
        var sorted;
        
        // sort cars by maker
        sorted = _.sortBy(dreamCars, "make");
        grouped = _.groupBy(sorted, "make");
        
        return grouped;
    };
    
    /**
     * Sorting function
     * Returns 0 if same, -1 if left comes before, 1 if left comes after
     * 
     * @param {object} left
     * @param {object} right
     * @returns {number} 
     */
    self.sortByModel = function (left, right) {
        return left.model === right.model ? 0 : (left.model < right.model ? -1 : 1);
    };
    
    /**
     * Select next model from the same maker if available
     * 
     * @param {object} maker - collection of vehicles from previously selected dream car
     * @returns {null}
     */
    self.selectNextCar = function (maker) {
        if (maker.models().length > 0) {
            return self.selectedCar(maker.models()[0]);
        }
        self.selectedCar(undefined);
    };
    
    /* start this baby up */
    self.initialize();
};

ko.applyBindings(new CarsViewModel());