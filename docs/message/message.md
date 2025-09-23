---
dependencias:
  - iam
  - o-auth
---
## Descripción
Message es una aplicación pensada para emitir comunicados a los usuarios de aurora. 
Solo está disponible para usuario logueados dentro de Aurora, por lo que es necesario algún tipo de autenticación para identificar los usuarios.


Dentro de la aplicación encontramos dos apartados diferenciados:
- Administración de mensajería
- Bendeja de entrada

## Bandeja de entrada

### Vista rápida
Por una parte tenemos un acceso a la bandeja de entrada en la parte superior derecha de la aplicación, donde indica el número de mensajes pendiente de lectura.

![[message-01.jpg]]

Si pulsamos sobre el icono nos aparecerá una vista resumida de los 10 últimos mensajes que tenemos en nuestra bandeja de entrada.

![[message-02.jpg|400]]

Los mensajes pendientes de lectura aparecerán marcados con un punto en la en lado derecho, si nos ubicamos sobre el mensaje aparecerá una X para poder eliminar el mensaje, y pulsando sobre el mismo nos redirigirá a la versión extendida del mensaje ubicada en la bandeja de entrada.

### Vista detalle
Dentro de la vista de detalle, arriba a la izquierda, tenemos el icono de opciones ![[message-04 1.jpg|15]], que nos despliega las siguientes acciones:

- Marcar mensaje como leído
- Borrar mensaje

También disponemos el indicados de mensaje importante ![[message-05.jpg|15]], para resaltar la relevancia del mensaje.

![[message-03.jpg|600]]

En el resto de pantalla se podrá ver el título del mensaje, el cuerpo del mismo y los adjuntos del mensaje, pulsando sobre los mismos, serán descargados.

## Gestor de mensajes
Desde este apartado se podrán confeccionar y lanzar mensajes a los grupos o usuarios que sean de interés.

Cuando creamos un mensaje, tendremos dos pestañas a seleccionar:
- **Destinatarios**, pestaña para seleccionar los tenants que pueden gestionar y visualizar la gestión del mensaje, y los usuarios a los que se enviarán el mensaje.
- **Redacción de mensaje,** pestaña para confeccionar el mensaje y adjuntar información adicional.

### Selección de destinatarios
Dentro de la sección de destinatarios disponemos de la siguientes opciones:

![[message-06.jpg]]

#### Tenants gestores
En el caso de tener una aplicación multi-tenant deberemos indicar los tenants que pueden visualizar y gestionar el mensaje.

Los tenants que aparecen en el listado, son tenants a los que pertenece el usuario creador del mensaje, no podrá otorgar la gestión del mensaje a un tenant al que no se pertenezca.

> [!Atención]
> Esto permitirá a usuarios gestionar el mensaje, no significa que estos usuarios recibirán los mensajes.

#### Tenants destinatarios
Introduciremos aquellos tenants que recibirán el mensaje redactado, solo aparecerán aquellos tenants que el usuario creador del mensaje pertenezca.

#### Scope destinatarios
Dentro del package OAuth podemos generar Scopes asociados a un Client (CLIENT_CREDENTIALS, PASSWORD AUTHORIZATION_CODE), estos scopes son asignados a cuentas de IAM, seleccionando estos scopes estamos incluyendo las cuentas a las que serán enviadas el mensaje.

#### Tags destinatarios
Dentro del package de IAM podemos crear tags que pueden ser asignados a cuentas, seleccionando estos tags en el apartado de tads destinatarios, estamos incluyendo a las cuentas que posean esos tagas.

#### Cuentas destinatarias
Dentro de esta sección podremos seleccionar usuarios de forma unitaria.

#### Combinación de destinatarios
Las opciones **Tenant destinatarios, Scope destinatarios y Tags destinatarios**, son filtros **excluyentes**, de tal manera que si seleccionamos uno o varios tenants, unos o varios scopes y uno o varios tags, solo se enviará el mensaje a las cuentas de los tenants indicados que sus cuentas tengan alguno de los scopes indicados y alguna de las tags indicadas.

Si además seleccionamos alguna cuenta en la tabla **Cuentas destinatarias**, es una opción **incluyente**, de tal manera que se enviará el mensaje a esas cuentas, indistintamente de las opciones marcadas anteriormente.

### Redacción de mensaje
A la hora de redactar un mensaje nos encontramos los siguientes campos bajo la pestaña **Redacción de mensaje:**

![[message-07.jpg]]

Con los campos.
**Enviar el**, fecha que deseas enviar el mensaje, ideal para dejar un mensaje programado.
**Es importante,** check para que al destinatario le aparezca el mensaje como importante.
**Asunto**, indica de que va a tratar el mensaje a enviar.
**Zona de contenido**, escribe el cuerpo del mensaje usando las posibilidades del editor de texto.
**Zona de adjuntos**, adjunta imágenes o ficheros que quieres enviar con el mensaje.
