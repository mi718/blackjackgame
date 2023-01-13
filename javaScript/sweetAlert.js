function betReminder(){ swal.fire({
 icon: 'info',
 allowOutsideClick: false,
 allowEscapeKey: false,
 allowEnterKey: false,
 stopKeydownPropagation: false,
 width: '20%',
 title: "Remember!!",
 text: 'In order to start the game you have to make a',
 input: 'number',
 inputPlaceholder: 'amount...',
 confirmButtonText: 'Bet',
 footer: 'made by: Micael Staeubli',
});}