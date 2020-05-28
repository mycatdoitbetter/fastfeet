<h1 align="center">Hermes</h1>
<p align="center">Hermes is a android aplication for managemento of delivery packs.</p>
<p align="center" style="text-align: center;">For this backend, i've used Docker for the database container, node as the main language end sequelize for the ORM.</p>
<br />

<p align="center"> 
  <a aria-label="Node version" href="https://github.com/nodejs">
    <img src="https://img.shields.io/badge/Node js- 12.16.3-informational?logo=node.js"></img>
  </a>
</p>

<br />
<l1>
The service have the following features:
    <ul>
    - Multi permissions platform (provider and deliveryman)
    </ul>
    <ul>
    - CRUD of users with middlewares routes for permissions
    </ul>
    <ul>
    - Association of images for user avatar profile
    </ul>
    <ul>
    - Association of images for user avatar profile
    </ul>
    <ul>
    - CRUD of <a href="https://github.com/mycatdoitbetter/hermes-backend/blob/master/src/database/migrations/20200404230518-create-users.js">users</a>, <a href="https://github.com/mycatdoitbetter/hermes-backend/blob/master/src/database/migrations/20200406005917-create-recipients.js">recipients</a>, <a href="https://github.com/mycatdoitbetter/hermes-backend/blob/master/src/database/migrations/20200414213732-create-package.js">packages</a> and <a href=
    "https://github.com/mycatdoitbetter/hermes-backend/blob/master/src/database/migrations/20200501222758-delivery-problems.js">delivery problems</a>
    </ul>
</l1>


 To init this backend, you will need a docker container with the <a href="https://github.com/mycatdoitbetter/hermes-backend/blob/master/.env.example">.env configs</a>, now, you can start the API with the following lines:
 ```bash
 cd hermes-backend
 yarn start
 ```
Also, to manage the services, you can use the <a href="https://insomnia.rest/download/">Insomnia</a> with this <a href="https://github.com/mycatdoitbetter/hermes-backend/blob/master/demo/InsomniaJSON-HERMES.json">configuration file</a>
