class Clock {
    constructor(interval) {
        this.interval = interval; // Interval in milliseconds
        this.timer = null;
        this.suscribers=[];
        this.time=0;
    }

    start(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
        this.stop(); // Ensure no duplicate timers
        this.timer = setInterval(() => {
            callback(this); // Pass the Clock instance to the callback
        }, this.interval);
    }
    startWithKey(callback) {
        this.callback=callback;

        document.addEventListener('keydown', (event) => {
            if (event.code ==="AltRight") { // Detecta si la tecla presionada coincide con la especificada
                
                this.callback(this);
            }
        });
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    update(){
        this.suscribers.forEach((suscriber)=>{
            suscriber.notify();
        })
    }
    subscribe(suscriber){
        this.suscribers.push(suscriber);
    }
}
export default Clock;

