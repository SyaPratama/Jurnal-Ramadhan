$.when($.ready).then(function () {
  $("#addJurnal").on("click", function () {
    $.ajax({
        url: "/jurnal",
        method: "POST",
        success: function()
        {
            return window.location.reload();
        }
    })
  });
});
