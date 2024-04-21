# App

GymPass Portfolio App (with geo location and focused on testing) using SOLID
- docker
- prisma 
- postgresql 
- fastify

## FRs (functional requirements)

- [x] must be possible to register;
- [x] must be possible to log in;
- [x] must be possible to fetch the profile details from the logged user;
- [ ] must be possible to fetch the number of check-ins from the logged user;
- [ ] must be possible to fetch the history of check-ins from the logged user;
- [ ] must be possible to fetch gyms around the logged user;
- [ ] must be possible to search for gyms using their name;
- [x] must be possible to the user check in a gym;
- [ ] must be possible to validate the user check-in;
- [x] must be possible to register a gym;

## BRs (business requirements)

- [x] the user cannot register with duplicated email;
- [x] the user cannot check-in twice at the same day;
- [x] the user cannot check-in far from 100 meters of the gym;
- [ ] the check must be validated within 30 minutes;
- [ ] the check-in only may be validated by administrators;
- [ ] the gym only may be registered by administrator;

## NFRs (non-functional requirements)

- [x] the user password must be cryptographed 
- [x] all the data must be persisted in a PostgreSQL database;
- [ ] all the data list must be paged by 20 items per page;
- [ ] the user must be idetified by JWT.
