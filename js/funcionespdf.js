// Funcion para crear PDF en caso Discreto
function CasoDiscretoPDF(matrix, coefs){
  var pdf = new jsPDF('p', 'pt', 'letter');// parametros:  orientacion (portrait, landscape),unidad de medida a utilizar y tamaño del pdf
  var y=100; //Variable para llevar posicion en x del texto
  var x=40;//variable para llevar posicion en y del texto
  var p=y;
  pdf.setFontSize(18);
  pdf.setFont('Courier', 'bold');
  pdf.setTextColor(0,2,50);
  pdf.text('Reporte de Minimos Cuadrados - Caso Discreto', x,45)
  pdf.setFontSize(12);
  pdf.text('by "SMIRNOV"', x, 60)
  pdf.setFont('Helvetica', 'Oblique');
  pdf.setFontSize(12);
  pdf.setTextColor(0,0,0);
  y+=20;
  pdf.text('Ecuaciones Normales encontradas: ', x ,y)
  // variable e = numero de ecuaciones normales
  var e = new Array();
  e=ecNormales(matrix,coefs);
  for (var i = 0; i < e.length; i++) {
    pdf.text('Ecuación ' + i + ': ', 290, y)
    pdf.text(e[i], 355, y)
    y+=20;
    }
  y+=20;
  pdf.text('Coeficientes encontrados: ', x ,y)
// variable f = numero de incognitas encontradas
  var f = new Array();
  f=solveEcc(matrix, coefs);
  for (var i = 0; i < f.length; i++) {
    pdf.text('C' + i + '= ', 290, y)
    pdf.text(f[i] + '', 315, y)
    y+=20;
    }
  y+=20;
  pdf.text('Polinomio generado mediante Minimos Cuadrados: ', x, y)
  pdf.setFont('Courier', 'bold');
  pdf.setFontSize(10)
  y+=30;
  var polinomio=document.getElementById('inputF').value; // Llenar variable con respuesta XD
  pdf.text(polinomio, x-15, y)
  y+=30;
  pdf.setFont('Helvetica', 'Oblique');
  pdf.setFontSize(12);
  pdf.text('A continuación presentamos una tabla con los valores interpolados con nuestro polinomio: ', x, y)
  y+=30;
  x+=165;
// Creacion Tabla
  pdf.setLineWidth(1);
  pdf.setDrawColor(0,2,50);
  pdf.line(x,y,x+200,y);//Linea superior de la tabla
  pdf.line(x,y+20,x+200,y+20);//Linea inferior de los titulos de la tabla
  pdf.line(x,y,x,y+20);// linea lateral izquiera de los titulos de la tabla
  pdf.line(x+200,y,x+200,y+20);//linea lateral derecha de los titulos de la tabla
  pdf.line(x+100,y,x+100,y+20);//linea divisora de los titulos de la tabla
  pdf.text('valor en x', x+10, y+16);
  pdf.text('f(x)', x+110, y+16);
  y+=20;
  var inter=5;//variable que tiene el array de valores a interpolar
  var eva; // variable que tiene el array de los valores ya interpolados
  var reales; // variable que tiene el array de valores evaluados en funcion original
  for (var i = 0; i < inter; i++) {
    pdf.line(x,y,x,y+20);//linea lateral derecha
    pdf.line(x+200,y,x+200,y+20);//linea lateral izquierda
    pdf.line(x+100,y,x+100,y+20);//linea divisora
    pdf.text('valor '+i, x+10, y+16);
    pdf.text('valor evaluado '+i, x+110, y+16);
    y+=20;
  }
  pdf.line(x,y,x+200,y);//linea inferior de la tabla
  pdf.save('SmirnovCasoDiscreto');
}


//funcion para crear PDF en caso continuo
function CasoContinuoPDF(){
  var pdf = new jsPDF('p', 'pt', 'letter');
  var y=100; //Variable para llevar posicion en x del texto
  var x=40;//variable para llevar posicion en y del texto
  var p=y;
  pdf.setFontSize(18);
  pdf.setFont('Courier', 'bold');
  pdf.setTextColor(0,2,50);
  pdf.text('Reporte de Minimos Cuadrados - Caso Continuo', x,45)
  pdf.setFontSize(12);
  pdf.text('by "SMIRNOV"', x, 60)
  pdf.setFont('Helvetica', 'Oblique');
  pdf.setFontSize(12);
  pdf.setTextColor(0,0,0);
  pdf.text('Función ingresada por el usuario: ', x, y)
  //variable que almacena la funcion
  var fun='f(x)= cos(5*x)+sin^2(6*x)+x'
  pdf.text(fun, 290, y);
  y+=40;
  pdf.text('Intervalo ingresado por el usuario:', x, y)
  var intervalo='[ 1 , 6 ]';
  pdf.text(intervalo,x+290, y )
  y+=40;
  pdf.text('Ecuaciones Normales encontradas: ', x ,y)
  // variable e = numero de ecuaciones normales
  var e = new Array();
  for (var i = 0; i < e.length; i++) {
    pdf.text('Ecuación ' + i + ': ', 290, y)
    pdf.text('Q1x + Q2x^2 - Q3x^3', 355, y)
    y+=20;
    }
  y+=20;
  pdf.text('Coeficientes encontradas: ', x ,y)
  // variable f = numero de incognitas encontradas
  var f = 4;
  for (var i = 0; i < f; i++) {
    pdf.text('Q ' + i + '= ', 290, y)
    pdf.text(i + '', 315, y)
    y+=20;
    }
  y+=20;
  pdf.text('Polinomio generado mediante Minimos Cuadrados: ', x, y)
  pdf.setFont('Courier', 'bold');
  pdf.setFontSize(9)
  y+=30;
  var polinomio=document.getElementById('inputF').value; // Llenar variable con respuesta XD
  pdf.text(polinomio, x-15, y)
  y+=30;
  pdf.setFont('Helvetica', 'Oblique');
  pdf.setFontSize(12);
  pdf.text('A continuación presentamos una tabla con los valores interpolados con nuestro polinomio: ', x, y)
  y+=30;
  x+=75;
  // Creacion de la tabla
  pdf.setLineWidth(1);
  pdf.setDrawColor(0,2,50);
  pdf.line(x,y,x+400,y);//linea horizontal superior de la fila de titulos
  pdf.line(x,y+20,x+400,y+20);//linea horizontal inferior de la fila de titulos
  pdf.line(x,y,x,y+20);//linea lateral izquierda de la fila de titulos
  pdf.line(x+200,y,x+200,y+20);// linea divisora central de la fila de titulos
  pdf.line(x+100,y,x+100,y+20);//linea divisora izquierda de la fila de titulos
  pdf.line(x+300,y,x+300,y+20);//linea divisora derecha de la fila de titulos
  pdf.line(x+400,y,x+400,y+20);//linea lateral derecha de la fila de titulos
  pdf.text('valor en x', x+10, y+16);
  pdf.text('f(x)', x+110, y+16);
  pdf.text('valor real', x+210, y+16);
  pdf.text('ERP' , x+310,y+16);
  y+=20;
  var inter=5;//variable que tiene el array de valores a interpolar
  var eva; // variable que tiene el array de los valores ya interpolados
  var real;//variable que contiene el array de valores evaluados en la funcion original
  for (var i = 0; i < inter; i++) {
    pdf.line(x,y,x,y+20);//linea lateral izquierda
    pdf.line(x+200,y,x+200,y+20);//linea divisora central
    pdf.line(x+100,y,x+100,y+20);//linea divisora izquierda
    pdf.line(x+300,y,x+300,y+20);//linea divisora derecha
    pdf.line(x+400,y,x+400,y+20);//linea lateral derecha
    pdf.text('valor '+i /*inter[i]*/, x+10, y+16);
    pdf.text('valor evaluado '+i /*eva[i]*/, x+110, y+16);
    pdf.text('valor real ' +i /*real[i]*/, x+210, y+16);
    pdf.text('ERP '+i /* ((real[i]-eva[i])/real[i])*100 + '%' */, x+310,y+16);
    y+=20;
  }
  pdf.line(x,y,x+400,y);//Linea inferior de la tabla

  pdf.save('SmirnovCasoContinuo');
}


// funcion para formar ecuaciones normales
function ecNormales( coeficientes, resultados){ // recibe los coeficientes de las ecuaciones normales y a que esta igualada la ecuacion
  var arreglo= new Array();
  for (var i = 0; i < coeficientes.length; i++) {
    var ec="";//reinicia la variable en cada iteracion
    for (var j = 0; j < coeficientes[i].length; j++) {
        if (j<coeficientes[i].length-1) {
          ec+="C"+j+"*"+coeficientes[i][j]+" + ";// agrega cada constante a la cadena - arma la ecuacion
        }else {
          ec+="C"+j+"*"+coeficientes[i][j];
        }
    }
    ec+=" = "+ resultados[i];// agrega el factor a lo que esta igualada la ecuacion
    arreglo.push(ec);// añade la ecuacion formada al arreglo
  }
  return arreglo; // regresa un arreglo con todas las ecuaciones normales formadas
}
