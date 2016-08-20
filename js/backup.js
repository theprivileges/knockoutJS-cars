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
        var cached = self.sortDreamCars();
        self.allCars(cached);
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
        
        if (selected) {
            self.dreamCars.push(selected);
            
            _.each(allCars, function (maker) {
                maker.cars.remove(selected);
                maker.cars.sort(self.sortByName);
            });
            
            self.allCars(allCars);
        }
        
    };
    
    /**
     * Removes car from wish list
     * 
     * @returns {null}
     */
    self.removeCar = function (car) {
        var allCars = self.allCars();
        
        console.debug(allCars);
        
    };
    
    self.sortDreamCars = function () {
        var grouped = {};
        var sorted = [];
        
        // sort cars by maker
        dreamCars = _.sortBy(dreamCars, "make");

        // group cars by maker
        _.each(dreamCars, function (vehicle) {
            if (!grouped.hasOwnProperty(vehicle.make)) {
                grouped[vehicle.make] = {
                    make: vehicle.make,
                    cars: ko.observableArray([])
                };
                sorted.push(grouped[vehicle.make]);
            }
            grouped[vehicle.make].cars.push(vehicle);
            // sort cars alphabetically
            grouped[vehicle.make].cars.sort(self.sortByModel);
            
        });
        
        return sorted;
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
    
    /* start this baby up */
    self.initialize();
};

ko.applyBindings(new CarsViewModel());