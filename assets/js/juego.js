const miModulo = (() => {

    'option strict';

    let deck  = [];
    const tipos = ['C','D','H','S'], 
          especiales = ['A', 'J','Q','K'];
    
    
    
//    let puntosJugador  = 0,
//        puntosComputadora = 0; 

    let puntosJugadores = []; 
    
    
    // referencias html 
    
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener"),
          btnNuevo = document.querySelector("#btnNuevo");
    
    const puntosHtml = document.querySelectorAll("small");
    
    const divCartasJugadores = document.querySelectorAll(".divCartas"); 
        

    const inicializarJuego = (numJugadores = 2) => {
   
        deck = crearDeck(); 

        puntosJugadores = []; 

        for(let i = 0; i <  numJugadores; i++){

            puntosJugadores.push(0);
        }

        puntosHtml.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem =>  elem.innerHTML = "");
    
        console.clear();
   
        btnDetener.disabled = false; 
        btnPedir.disabled = false;
    
        
    }
    
    const crearDeck = () => {
    
        
        deck = []; 
    
        for(let tipo of tipos){
            for( let i = 2; i<=10; i++){
                    deck.push(i + tipo);
            }
    
            for( let e  of especiales){
                 deck.push(e + tipo)
            }
        }
    
        return _.shuffle( deck ); 
    
    }
    

    
    const pedirCarta = () => {
    
        if(deck.length === 0){
            throw 'No hay caras en el deck';
        }
    
        return deck.pop();      
    
    }
    
    
    const valorCarta = (carta) => {
    
        const valor = carta.substring(0, carta.length - 1);
    
    
        if(valor === 'A'){
            puntos = 11; 
        }
        else if(['J','Q','K'].includes(valor)){ 
            puntos = 10;
        }
        else {
            puntos = valor * 1;     
        }
    
        return puntos; 
    }
    
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] += valorCarta(carta);    
        puntosHtml[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno]; 

    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img'); 
            
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta"); 
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosJugador, puntosComputadora] = puntosJugadores; 

        setTimeout(() => {
    
            if (puntosJugador > 21) 
                alert("Ganó la computadora!");
            
            else if (puntosComputadora > 21 )
                alert("Ganó el jugador");
                
            else if(puntosComputadora > puntosJugador)
                alert("Ganó la computadora!");
    
            else if(puntosJugador > puntosComputadora) 
                alert("Ganó el jugador");
    
            else 
                alert("Empataron el jugador y la computadora");
                
        },100);
            
    }

    const turnoComputadora = (puntosMinimos) => {
    
        let puntosComputadora = 0; 

        do{
            const carta = pedirCarta();                       
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            
            crearCarta( carta, puntosJugadores.length - 1 );

    
        }
        while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
        determinarGanador();

    
    }
    
    // eventoss    
    btnPedir.addEventListener("click", ()=> {
    
        const carta = pedirCarta();        
        const puntosJugador = acumularPuntos(carta, 0); 

        crearCarta( carta, 0);
            
        if(puntosJugador > 21){
            console.warn("Perdió el jugador!"); 
            btnPedir.disabled = true;  
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador); 
    
        }
        else if (puntosJugador === 21){
            console.info("ganaste");
            btnPedir.disabled = true; 
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador); 
        }
    
    
    });
    
    
    btnDetener.addEventListener("click", () => {
    
        const puntosJugador = puntosJugadores[0];

        btnDetener.disabled = true; 
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    
    })
    
    btnNuevo.addEventListener("click", () => {
 
        inicializarJuego();
    
    })

    return {
        nuevoJuego: inicializarJuego
    }

})();




