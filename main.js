'use strict';
let imputNombre = $("#nombre");
let imputApellido = $("#apellido");
let imputDni = $("#dni");
let imputAsiento = $("#asiento");
let contenedorListar = $("#contenedorListar");
let btnEnviar = $("#btnEnviar");
let btnReservar = $("#btnReservar");
let btnLiberar = $("#btnLiberar");
let btnBuscar = $("#btnBuscar");
let btnCancelar = $("#btnCancelar");
let btnCancelarListar = $("#btnCancelarListar");
let selecAsientos = $("#selecAsientos");
let tablero = $("#tablero");
let secMenu = $("#secMenu");
let secAsientosInfo = $("#secAsientosInfo");
let secListar = $("#secListar");

class Aplicacion
{
    constructor()
    {
        this.opcion = $("#opcion");
        this.enfocar();
    }
    
    enfocar()
    {
        this.opcion.val("");
        this.opcion.focus();
    }
    comprobarOpcion()
    {
        if(this.opcion.val() == 1)
        {
            secMenu.addClass("oculto");
            secAsientosInfo.removeClass("oculto");
            selecAsientos.removeClass("oculto");
            imputDni.removeAttr('disabled');
            imputNombre.removeAttr('disabled');
            imputApellido.removeAttr('disabled');
            btnReservar.removeClass("oculto");
            btnLiberar.addClass("oculto");
            btnBuscar.addClass("oculto");
            //btnCancelar.removeClass("oculto");
        }
        else if(this.opcion.val() == 2)
        {
            secMenu.addClass("oculto");
            secAsientosInfo.removeClass("oculto");
            selecAsientos.removeClass("oculto");
            imputDni.attr('disabled', true);
            imputNombre.attr('disabled', true);
            imputApellido.attr('disabled', true);
            btnReservar.addClass("oculto");
            btnLiberar.removeClass("oculto");
            btnBuscar.addClass("oculto");
            //btnCancelar.removeClass("oculto");
        }
        else if(this.opcion.val() == 3)
        {
            secMenu.addClass("oculto");
            secAsientosInfo.removeClass("oculto");
            selecAsientos.addClass("oculto");
            imputDni.removeAttr('disabled');
            imputNombre.attr('disabled', true);
            imputApellido.attr('disabled', true);
            btnReservar.addClass("oculto");
            btnLiberar.addClass("oculto");
            btnBuscar.removeClass("oculto");
            //btnCancelar.removeClass("oculto");
        }
        else if(this.opcion.val() == 4)
        {
            secMenu.addClass("oculto");
            secAsientosInfo.addClass("oculto");
            secListar.removeClass("oculto");
            bus.listar();
        }
        else
        {
            alert("Opcion incorrecta. Vuelva a ingresar");
            this.enfocar();
        }
    }
}

class Pasajero
{
    constructor(nombre, apellido, dni, asiento)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.asiento = asiento;   
    }
    mostrar()
    {
        if(this.nombre != undefined)
        {
            imputNombre.val(this.nombre);
            imputApellido.val(this.apellido);
            imputDni.val(this.dni);
            imputAsiento.val(this.asiento);
        }
        else
        {
            this.limpiarTodo(false);
        }
    }
    limpiarTodo(todo)
    {
        imputNombre.val("");
        imputApellido.val("");
        imputDni.val("");
        if(todo)
        {
            imputAsiento.val("");
        }
    }
}

class Bus
{
    constructor()
    {
        this.pasajeros = [];
        this.numAsiento = 0;
        this.crearCeldas(10);
        this.celdas = $("td");
        console.log(this.celdas);
        for(let i = 0; i < this.celdas.length; i++)
        {
            this.pasajeros[i] = new Pasajero(undefined, undefined, undefined, undefined);
        }
        console.log(this.celdas.length)
        console.log(this.pasajeros);
    }
    redireccionar(event)
    {
        this.numAsiento = (event.target.textContent);
        imputAsiento.val(this.numAsiento);
        console.log(this);
        this.pasajeros[this.numAsiento - 1].mostrar();
        imputDni.focus();
        //contenedorListar.innerHTML = "";
    }
    
    reservar()
    {
        if(imputAsiento.val() != "" && imputNombre.val() != "" && imputApellido.val() != "" && imputDni.val() != "")
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(imputNombre.val(), imputApellido.val(), imputDni.val(), this.numAsiento);
            this.pasajeros[0].limpiarTodo(true);
            for(let i in this.celdas)
            {
                if(this.celdas[i].textContent == this.numAsiento)
                {
                    this.celdas[i].classList.add("pintar");
                    break;
                }
            }
        }
        else
        {
            alert("Faltan datos jkjkj");
            imputNombre.focus();
        }
    }
    liberar()
    {
        if(this.pasajeros[this.numAsiento - 1].nombre != undefined)
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(undefined, undefined, undefined, undefined);
            this.pasajeros[0].limpiarTodo(true);
        }
        for(let i in this.celdas)
        {
            if(this.celdas[i].textContent == this.numAsiento)
            {
                this.celdas[i].classList.remove("pintar");
                break;
            }
        }
    }
    buscar()
    {
        for(let i in this.pasajeros)
        {
            if(imputDni.val() == this.pasajeros[i].dni)
            {
                this.pasajeros[i].mostrar();
                break;
            }
            else
            {
                if(i == this.pasajeros.length - 1)
                {
                    this.pasajeros[0].limpiarTodo(true);
                    alert("No se encontro el DNI");
                }
            }
        }
        //imputDni.val("");
        imputDni.focus();
    }
    listar()
    {
        let contenedor = "";
        for(let i in this.pasajeros)
        {
            if(this.pasajeros[i].nombre != undefined)
            {
                contenedor += "<p><b>Nombre:</b> " + this.pasajeros[i].nombre + "<br>";
                contenedor += "<b>Apellido:</b> " + this.pasajeros[i].apellido + "<br>";
                contenedor += "<b>DNI:</b> " + this.pasajeros[i].dni + "<br>";
                contenedor += "<b>Asiento:</b> " + this.pasajeros[i].asiento + "</p>";
            }
        }
        contenedorListar.html(contenedor);
    }
    crearCeldas(total)
    {
        let numFilas = total/5;
        let numColum = total/2;
        tablero.empty();
        for(let i = 0; i < numFilas; i++)
        {
            let fila = $("<tr>");
            for(let j = 0; j < numColum; j++)
            {
                let columna = $('<td>');
                columna.id = `${i}${j}`;
                columna.text(i * numColum + j + 1);
                columna.addClass("btn");
                columna.addClass("btn-default");
                columna.click((event) => this.redireccionar(event));
                fila.append(columna);
            }
            tablero.append(fila);
        }
    }
}
let bus = new Bus();
let apli = new Aplicacion();

btnEnviar.click(function(e)
{
    e.preventDefault();
    apli.comprobarOpcion();
});

btnReservar.click(function(e)
{
    e.preventDefault();
    bus.reservar();
    setTimeout(function()
    {
        secMenu.removeClass("oculto");
        secAsientosInfo.addClass("oculto");
        apli.enfocar();
    }, 500);
});

btnLiberar.click(function(e)
{
    e.preventDefault();
    bus.liberar();
    setTimeout(function()
    {
        secMenu.removeClass("oculto");
        secAsientosInfo.addClass("oculto");
        apli.enfocar();
    }, 500);
});

btnBuscar.click(function(e)
{
    e.preventDefault();
    bus.buscar();
});

btnCancelar.click(function(e)
{
    e.preventDefault();
    secMenu.removeClass("oculto");
    secAsientosInfo.addClass("oculto");
    apli.enfocar();
});

btnCancelarListar.click(function(e)
{
    btnCancelar.click();
    secListar.addClass("oculto");
});