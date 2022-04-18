**FR** => Functional Requirement

**NFR** => Non-Function Requirement

**BR** => Business Rule

# Car register

**FR**

The application should be able to register a new car;
The application should be able to list all categories.

**BR**

The application should not be able to register a car with an already taken license plate;
A new car should be registred as an available car by default;
Only administrator users should be allowed to register a new car.

# Cars' list

**FR**

The application should be able to list the registred and available cars;
The application should be able to list all available cars by categorie's name;
The application should be able to list all available cars by brand's name;
The application should be able to list all available cars by car's name.

**BR**

Users without a valid session should be allowed to browse registred and available cars.

# Register of Car's specifications

**FR**

The application should be able to register a car's specification;

**BR**

The application should not be able to register a specification for a non-registred car;
The application should not be able to register an already registered specification for a car;
Only administrator users should be allowed to register a new specification.

# Car's image register

**FR**

The application should be able to register a car's image;

**NFR**

Use multer to upload files.

**BR**

User must be allowed to register more than one image for the same car;
Only administrator users should be allowed to register a new car.

# Car's rental

**FR**

The application should be able to register a rental.

**BR**

Rentals should have a minimal duration of one day;
Users should have only one on going rental;
Cars should have only one on going rental.
User must be logged in.
A car rental should set this same car as unavailable

# Rental's return

**FR**

User should be able to return a rental

**BR**

Rentals returned in less than 24h will be charged as a fully daily
When returning a rental, the car must be set as available
When returning a rental, the user must be set as available for another rental
When returning a rental, the total cost should be calculated
If the time of returning is superior to the contracted time, a fine, proportional to the delay time, should be charged
If there's a charge, it should be added to the total costs of the rental
User must be logged in

# List user's rentals

**FR**

The application should be able to search for all user's rentals

**BR**

The user must be logged in
