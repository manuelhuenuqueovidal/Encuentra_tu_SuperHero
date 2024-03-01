// Filtro de números
$(document).ready(function () {
  $("#form").submit(function (event) {
    event.preventDefault();
    var valor = $("#numero").val();
    if (!/^\d+$/.test(valor)) {
      alert("Ingrese solo números en el campo.");
      return;
    } else if (valor <= 732) {
    } else {
      alert("La lista sólo llega hasta el puesto 732, busca en ese rango numérico.");
    }

    //Ajax.
    $.ajax({
      type: "GET",
      url: "https://superheroapi.com/api.php/4905856019427443/" + valor,
      dataType: "json",
      success: function (data) {
        $(".card-title").text(data.name);
        $(".card-text1").text(data.powerstats.power);
        $(".card-text2").text(data.work.occupation);
        $(".card-text4").text(data.appearance.height);
        $(".card-text5").text(data.appearance.weight);
        $(".img-fluid").attr("src", data.image.url);

        //Gráfico pastel Canvas.
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          title: {
            text: "Estadísticas"
          },
          data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
              { y: data.powerstats.power, label: "Poder" },
              { y: data.powerstats.durability, label: "Durabilidad" },
              { y: data.powerstats.speed, label: "Velocidad" },
              { y: data.powerstats.strength, label: "Fuerza" },
              { y: data.powerstats.intelligence, label: "Inteligencia" },
              { y: data.powerstats.combat, label: "Combate" }
            ]
          }]
        });
        chart.render();
      },
      error: function (error) {
        console.log(error);
      },
     });
  });
});
