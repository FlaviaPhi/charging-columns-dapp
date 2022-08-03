App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
    // Load columns.
    $.getJSON('../columns.json', function(data) {
        var columnsRow = $('#columnsRow');
        var columnsTemplate = $('#columnsTemplate');
  
        for (i = 0; i < data.length; i++) {
            columnsTemplate.find('.panel-title').text(data[i].name);
            columnsTemplate.find('img').attr('src', data[i].picture);
            columnsTemplate.find('.column-brand').text(data[i].brand);
            columnsTemplate.find('.column-MaxPower').text(data[i].MaxPower);
            columnsTemplate.find('.column-location').text(data[i].location);
            columnsTemplate.find('.btn-book').attr('data-id', data[i].id);
  
            columnsRow.append(columnsTemplate.html());
        }
      });
  
      return await App.initWeb3();
    },

    initWeb3: async function(){
        //Modern dapp browser...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.request({method: "eth_requestAccounts"});
            } catch (error) {
                //User denied account access
                console.error("User denied account access")
            }
        }

        //Legacy dapp browsers
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function(){
        console.log('ciao sono dentro initContract')

        $.getJSON('BookingColumns.json', function(data){
            //Get the necessary contract artifact file and instantiate it with @truffle/contract

            //Artifacts are informations about the contract such as deployed address and variables, functions, parameters
            var BookingArtifact = data;
            App.contracts.BookingColumns = TruffleContract(BookingArtifact);

            // Set the provider for our contract
            App.contracts.BookingColumns.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the booked columns
            return App.markBooked();
        });
        return App.bindEvents();
    },

    //bindEvents: function(num) {
        
    bindEvents: function() {
        console.log('ciao sono dentro bindEvents')
        $(document).on("click", ".btn-book", App.handleBook);
        
        //return App.handleBookTwo(num)
    },

    markBooked: function() {
        var bookingInstance;

        console.log('ciao sono dentro markBooked')


        App.contracts.BookingColumns.deployed().then(function(instance) {
            bookingInstance = instance;

            return bookingInstance.getBookers.call();
        }).then(function(bookers){
            for (i=0; i< bookers.length; i++) {
                if (bookers[i] !== '0x0000000000000000000000000000000000000000') {
                    $('.panel-column').eq(i).find('button').text('Success').attr('disabled', true);
                }
            }
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    handleBook: function(event) {
        console.log('ciao sono dentro handleBook')

        event.preventDefault();

        var columnId = parseInt($(event.target).data('id'));

        var bookingInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.BookingColumns.deployed().then(function(instance) {
                bookingInstance = instance;

                //Execute booking as a transaction by sending account
                return bookingInstance.booking(columnId, {from: account});
            }).then(function(result) {
                return App.markBooked();
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },

    handleBookTwo: function(num) {
        console.log('ciao sono dentro handleBookTwo')

        // event.preventDefault();

        var columnId = num;

        var bookingInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.BookingColumns.deployed().then(function(instance) {
                bookingInstance = instance;

                //Execute booking as a transaction by sending account
                return bookingInstance.booking(columnId, {from: account});
            }).then(function(result) {
                return App.markBooked();
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    }

    };

$(function() {
    $(window).load(function() {
      App.init();
    });
  });
  