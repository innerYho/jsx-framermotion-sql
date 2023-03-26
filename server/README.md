
npm init -y
npm i express express-myconnection cors mysql2
npm i nodemon -D

    #Vamos al apartado de scripts del archivo y lo configuramos con la siguiente linea de código

"start": "nodemon src/index.js"


    #En la base de datos
CREATE USER 'devuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'DevUser$'; 

GRANT ALL PRIVILEGES ON *.* TO 'devuser'@'localhost';
FLUSH PRIVILEGES;

ALTER USER 'devuser'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;



    # variables de entorno. Normalmente no se suben a git.
npm i dotenv

<!--
No funcionaron pero la sintaxis era correcta
 GRANT ALL PRIVILEGES ON . TO 'devuser'@'localhost' WITH GRANT OPTION; 
GRANT ALL PRIVILEGES ON db_water.* TO 'devuser'@'%' WITH GRANT OPTION; -->