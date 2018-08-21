RIPIO APP
========

Esta es un app demo, en la cual la idea es desarrollar un sistema que genere transacciones de monedas.  
Se puede revisar tu cuenta, trabajar para ganar puntos y hacer transferencias a otros usuarios.  
<br />
Pasos arrancar el sistema ejecutar (Necesitas docker y docker-compose).  
<br />
1)Generar los servidores node y django.  
`docker-compose build`.  
2)Hacer las migraciones.  
`docker-compose run web python3 manage.py migrate`.  
3)Crear los indices en elasticsearch.  
`docker-compose run web python3 manage.py search_index --rebuild`.  
4)Arrancar el sistema.  
`docker-compose up`.  
<br />
El front corre en localhost:3000.  
El back corre en localhost:8000.  
<br />
si tenes problemas con el volumen de postgres. 
crealo a mano con :  
`
docker volume create pgdata.  
`
<br />
si tenes problemas con el volumen de elasticsearch.  
crealo a mano con :  
`
docker volume create esdata.  
`