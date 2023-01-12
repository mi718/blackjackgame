function betAlert(){ swal.fire({
 allowOutsideClick: false,
 allowEscapeKey: false,
 allowEnterKey: true,
 stopKeydownPropagation: false,
 width: '20%',
 title: "How much you wish to bet?",
 text: 'to continue please enter an amount',
 input: 'number',
 inputPlaceholder: 'amount...',
 confirmButtonText: 'Bet',
 footer: 'made by: Micael Staeubli'
});}