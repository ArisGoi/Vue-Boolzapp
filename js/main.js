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
                        date: '15:30 del 10/01/2020',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '15:50 del 10/01/2020',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '16:15 del 10/01/2020',
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
                    date: '16:30 del 20/03/2020',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '16:30 del 20/03/2020',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '16:35 del 20/03/2020',
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
                    date: '10:10 del 28/03/2020',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '10:20 del 28/03/2020',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '16:15 del 28/03/2020',
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
                    date: '15:30 del 10/01/2020',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '15:50 del 10/01/2020',
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
         * FUNZIONE GET DATE
         * Restituisce la data e l'ora corretti del momento in cui viene richiamata
        */
        currentDate() {
            const current = new Date();
            const date = `${current.getHours()}:${current.getMinutes()} del ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            return date;
          },

        /**
         * INVIO MESSAGGIO
         * Ottenendo un testo da un input
         * Pusha il testo nella lista dei messaggi, con valore "Sent"
         */
        sendMessage: function(){
            this.contacts[this.currentContact].messages.push({
                date: this.currentDate(),
                message: this.sendBoxInput,
                status: 'sent'
            });
            // Richiamo la funzione di risposta automatica
            this.autoReply(this.sendBoxInput);
            // svuoto il campo input
            this.sendBoxInput = "";

            this.playSound('sound/sent.wav')

        },

        playSound (sound) {
            if(sound) {
              var audio = new Audio(sound);
              audio.play();
            }
          },

        /**
         * RISPOSTA AUTOMATICA
         * Richiamata da sendMessage()
         * ottiene il valore dell'ultimo messaggio e elabora una risposta
         * Dopo un numero di secondi...
         * Pusha il testo nella lista dei messaggi, con valore "received"
         */
        autoReply(lastMsg) {
            let reply = lastMsg;
            switch(lastMsg.toLowerCase()){
                case 'ciao':
                    reply = 'Ciao anche a te!';
                break;

                case '🖖':
                    reply = `🖖 Ciao anche a te!`;
                break;

                case 'che ore sono?':
                    reply = `Guarda che sul telefono hai l'orologio!! Comunque sono le ${this.askDate()}`;
                break;

                case 'chi sei?':
                    reply = `Ciaoo! Mi chiamo ${this.contacts[this.currentContact].name}`;
                break;

                case 'sicuro di non aver sbagliato chat?':
                    reply = `Ah scusa!`;
                break;

                case 'come stai?':
                    reply = `Bene grazie! e tu?`;
                break;

                case 'bene':
                    reply = `mi fa piacere`;
                break;
                
                case 'male':
                    reply = `Che peccato! cosa ti è successo?`;
                break;

                case 'non voglio dirlo':
                    reply = `Tieniti pure i tuoi segreti...`;
                break;

                case 'conosci mr.robot?':
                    reply = `Non dovresti fare quel nome...`;
                break;

                case 'consigliami una serie tv':
                    reply = `Non saprei... Molte serie belle le trovi su Netflix. A me sono piaciute molto Mr.Robot e Final Space`;
                break;
                    
                default: reply =  'ok'
            };

            const contactToSend = this.currentContact;

            setTimeout(() => {
                this.contacts[contactToSend].messages.push({
                    date: this.currentDate(),
                    message: reply,
                    status: 'received'
                });
                this.playSound('sound/receive.mp3')
            }, 1000 * 3);
        },

        askDate() {
            const current = new Date();
            const date = `${current.getHours()} e ${current.getMinutes()}`;
            return date;
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