USE ReactNetCore
GO
--SELECT * FROM TblUsuarios
SELECT * --DELETE
FROM TblEquipos
WHERE equIdEquipo > 2
DBCC CHECKIDENT (TblEquipos, RESEED,2)

--UPDATE TblEquipos
set equNombreEquipo = 'NAcional'
WHERE equIdEquipo = 3

Juan

SELECT * --DELETE
FROM TblEquipos
WHERE equIdEquipo = 2

SELECT * --DELETE
FROM tblJugadores
WHERE equIdEquipo = 2

INSERT INTO tblJugadores VALUES ('Juan',17)


19
----INSERT INTO TblUsuarios VALUES('1','1'),('2','2')
--EXECUTE dbo.Sp_ValidarLogin 1,0
--ALTER PROCEDURE Sp_ValidarLogin
--@NombreUsuario VARCHAR(50),
--@Contrasenia VARCHAR(50)
--AS
--BEGIN
--	IF EXISTS(SELECT * FROM TblUsuarios WHERE usuNombreUsuario = @NombreUsuario AND usuContrasenia = @Contrasenia)
--		--SELECT 1 UsuIdUsuario
--		SELECT * FROM TblUsuarios
--	ELSE 
--		--SELECT 0 UsuIdUsuario
--		SELECT * FROM TblUsuarios
--END


1
--CREATE DATABASE ReactNetCore
--GO
--CREATE TABLE TblUsuarios(
--UsuidUsuario INT IDENTITY,
--UsunombreUsuario VARCHAR(50) NOT NULL,
--Usucontrasenia VARCHAR(50) NOT NULL
--CONSTRAINT PkUsuidUsuario PRIMARY KEY (UsuidUsuario)
--)
--GO
--CREATE TABLE TblEquipos(
--EquidEquipo INT IDENTITY,
--EqunombreEquipo VARCHAR(50) NOT NULL
--CONSTRAINT PkEquidEquipo PRIMARY KEY (EquidEquipo),
--)
--GO
--CREATE TABLE tblJugadores(
--JugidJugador INT IDENTITY,
--JugnombreJugador VARCHAR(50) NOT NULL,
--JugIdEquipo INT NOT NULL
--CONSTRAINT PkJugidJugador PRIMARY KEY (JugidJugador),
--CONSTRAINT FkJJugIdEquipo FOREIGN KEY (JugIdEquipo) REFERENCES TblEquipos(EquidEquipo)
--)
/*
Scaffold-DbContext "Data Source=DESKTOP-JAA2AET\SQLEXPRESS;Initial Catalog=ReactNetCore;Integrated Security=true" 
Scaffold-DbContext "Data Source=DESKTOP-JAA2AET\SQLEXPRESS;Initial Catalog=ReactNetCore;Integrated Security=SSPI;
User ID=myDomain\myUsername;Password=myPassword;"
Scaffold-DbContext "Server=XXX;Database=YYY;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

Usar este:
Scaffold-DbContext "Data Source=DESKTOP-JAA2AET\SQLEXPRESS;Initial Catalog=ReactNetCore;Integrated Security=true" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
Scaffold-DbContext "Data Source=DESKTOP-JAA2AET\SQLEXPRESS;Initial Catalog=ReactNetCore;Integrated Security=true" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force //ActualizarSp
Entity Framework Core 2
*/
