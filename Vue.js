const app = Vue.createApp({
    data() {
        return {
            name:"Random joke",
            smiley: "😂",
            jokee: ""
        }
    },
    methods: {
        async getJokes() {
            const res = await fetch('https://icanhazdadjoke.com', {
                headers:{
                    Accept:"application/json"
                }
            })
            const data = await res.json();
            const dataRes = data.joke
            console.log(dataRes);
            this.jokee = dataRes
            const msg = new SpeechSynthesisUtterance();
            msg.text = dataRes;
            msg.lang = 'en-US'
            msg.rate = 1.2
            speechSynthesis.speak(msg)
            // this.joke = data;
            // console.log(this.joke);
        },
        toggle() {
            this.getJokes()
        },
        recognizeVoice() {
            // const response = await fetch('https://icanhazdadjoke.com', {
            //     headers:{
            //         Accept:"application/json"
            //     }
            // })
            // const data = await response.json();
            // const dataResponse = data.joke
            
        }
    },
    mounted() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            const recognition = new SpeechRecognition();
            recognition.interimResults = true
            recognition.addEventListener('result', (e) => {
                const transcript = Array.from(e.results)
                .map(result=> result[0])
                .map(result => result.transcript)
                .join('');
                if (transcript == 'tell me a joke'){
                    this.getJokes()
                    // const msg = new SpeechSynthesisUttera    nce();
                    // msg.text = dataResponse;
                    // msg.lang = 'en-US'
                    // msg.rate = 1.2
                    // speechSynthesis.speak(msg)
                }
            })
            recognition.addEventListener('end', recognition.start)
            recognition.start();
    }
})
app.mount("#app");