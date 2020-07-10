Chart.aa=function(date){
  //  $("body").css("background","red");
  //alert(1);
  // $("#example1").DataTable();
  $('#example1').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": true,
  });
}
Chart.toast=function(con){
    toastr.error(con)
}
Chart.saveing=function(){
  toastr.success("save successful")
}
Chart.warning=function(title,subtitle,body){
  $(document).Toasts('create', {
    class: 'bg-warning', 
    title: title,
    subtitle: subtitle,
    body: body
  })
}
Chart.print=function(id){
  $("#"+id).print({
    globalStyles: true,
    mediaPrint: false,
    stylesheet: null,
    noPrintSelector: ".no-print",
    iframe: true,
    append: null,
    prepend: null,
    manuallyCopyFormValues: true,
    deferred: $.Deferred(),
    timeout: 750,
    title: null,
    doctype: '<!doctype html>'
});
}