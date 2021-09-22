const app = new Vue({
    el: "#root",
    data:{
        // RICERCA
        search: "",

        // INVIO MESSAGGIO
        sendBoxInput: "",

        // CONTATTI
        currentContact: 0,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ]
    },
    methods:{
        /**
         * SELEZIONE CONTATTO
         * Ottenendo un valore "index"
         * Inposta il contatto corrente ("currentContact") = all'index
        */
        chooseFriend: function(index){
            this.currentContact = index;
        },

        /**
         * INVIO MESSAGGIO
         * Ottenendo un testo da un input
         * Pusha il testo nella lista dei messaggi, con valore "Sent"
         */
        sendMessage: function(){
            this.contacts[this.currentContact].messages.push({
                date: '00/00/2021 00:00:00',
                message: this.sendBoxInput,
                status: 'sent'
            });
            // Richiamo la funzione di risposta automatica
            this.autoReply(this.sendBoxInput);
            // svuoto il campo input
            this.sendBoxInput = "";
        },

        /**
         * RISPOSTA AUTOMATICA
         * Richiamata da sendMessage()
         * ottiene il valore di "reply" e elabora una risposta
         * Pusha il testo nella lista dei messaggi, con valore "received"
         */
        autoReply(lastMsg) {
            var reply = lastMsg;
            setTimeout(() => {
                this.contacts[this.currentContact].messages.push({
                    date: '00/00/2021 00:00:00',
                    message: reply,
                    status: 'received'
                });
            }, 2000);
        },

        /**
         * FUNZIONE RICERCA CONTATTO
         * ottendendo l'indice del contatto e un'input "text"
         * Ritorna true o false se il nome del contatto contiene o meno le lettere inserite
        */
        searchResult: function(index){
            let uName = this.contacts[index].name.toLowerCase()
            if (uName.includes(this.search)){
                return true;
            }
            return false;
        },
        
    },
});