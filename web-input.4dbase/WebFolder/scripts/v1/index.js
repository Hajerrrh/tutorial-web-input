(function($, a, m){	    function filterEvent(e){        e.stopPropagation();        e.preventDefault();	        return false;    }        //disable text selection on page	    $('body').on('selectstart', filterEvent).on('drop', filterEvent).on('dragover', filterEvent).css({        '-webkit-user-select':'none',        '-moz-user-select':'none',        '-ms-user-select':'none',        '-o-user-select':'none',        'user-select':'none'    });     //jQuery references to page elements	    var productCode$ = $('#product-code');    var productCount$ = $('#product-count');    var logoutButton$ = $('#logout-button');        logoutButton$    .click(function(e){         $.ajax({             type: 'GET',             url: '/logout/',             async: true,             complete: function(request, status){                 window.location = '/';             }        })    })            productCode$    .blur((function(e){        e.preventDefault();        this.focus();    }).bind(productCode$))        .keydown((function(e){        if((e.keyCode === 13) || (e.keyCode === 9)){            e.preventDefault();            if(this.val().length){                $.post('/product/update', {code:this.val(), count:1}, (function(data){                                this.val('');                                        if(data.status == 'OK'){                        a.success(data.message);                        productCount$.text(data.count);                    }else{                        a.error(data.message);                        productCount$.text('');                    }                                    }).bind(this));                        }                }        }).bind(productCode$))    .focus();        window.history.replaceState('Object', 'Title', '/');                                                          a.set({'delay':1500});    m.lang(navigator.language);	            })(jQuery, alertify, moment);