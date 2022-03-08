**FR** => Functional Requirement

**NFR** => Non-Function Requirement

**BR** => Business Rule

#Car register

**FR**

Should be allowed to register a new car;
Should be allowed to list all categories.

**BR**

Should not be allowed to register a car with an already taken license plate;
Should not be allowed to change a registred car's license plate;
A new car should be registred as an available car by default;
Only administrator users should be allowed to register a new car.

#Cars' list

**FR**

Should be allowed to list the registred and available cars;
Should be allowed to lii all available cars by categorie's name;
Should be allowed to lii all available cars by brand's name;
Should be allowed to lii all available cars by car's name.

**BR**

Users without a valid session should be allowed to browse registred and available cars.

#Register of Car's specifications

**FR**

Should be allowed to register a car's specification;
Should be allowed to list all specifications;
Should be allowed to list all cars.

**BR**

Should not be allowed to register a specification for a non-registred car;
Should not be allowed to register an already registered specification for a car;
Only administrator users should be allowed to register a new specification.

#Car's image register

**FR**

Should be allowed to register a car's image;
Should be allowed to list all cars.

**NFR**

Utilizar o multer para upload dos arquivos.

**BR**

User must be allowed to register more than one image for the same car;
Only administrator users should be allowed to register a new car.

#Car's rental

**FR**

Should be allowed to register a rental.

**BR**

Rentals should have a minimal duration of one day;
Users should have only one on going rental;
Cars should have only one on going rental.
