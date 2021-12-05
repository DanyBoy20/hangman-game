import React, { Component } from 'react';
import {randomWord} from './Words';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
    /* PROPIEDADES POR DEFECTO */
    // maxWrong: son los intentos maximos a equivocarse | images: el arreglo de imagenes del colgado/hangman
    static defaultProps = {
        maxWrong: 6,
        images: [img0, img1, img2, img3, img4, img5, img6]
    }
    /* CONSTRUCTOR - CAMBIOS DE ESTADO DE LAS PROPIEDADES */
    constructor(props) {
        super(props);
        // Estados iniciales: nWrong: a 0 al iniciar, se incrementara segun se equivoca el usuario
        // guessed: arreglo vacio de letras ya adivinadas, se agregara cada letra (a un nuevo set: new Set()) que el usuario adivine
        // answer: palabra a adivinar, se obtiene de la propiedad answer de la clase padre (se cambiara por un arreglo)
        this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
        this.handleGuess = this.handleGuess.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset(){
        this.setState({
            nWrong: 0,
            guessed: new Set(),
            answer: randomWord()
        });
    }

    /* guessedWord() muestra el estado actual de la palabra a adivinar, por ejemplo */
    // si las letras adivinadas son {a, p, p} mostrara "a p p_ _ "
    guessedWord(){
        // a la respuesta "answer" (L24 answer: "apple"), la dividimos con split, y con map iteramos sobre cada letra
        // y comparamos si esta en el arreglo de letras adivinadas "guessed"
        // en resumen, retornamos la letra si existe , o retornamos  _
        return this.state.answer
            .split("")
            .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    }

    /* handleGuest: gestiona la letra adivinada */
    // add añadira letras, si no esta en la respuesta "answer", se incrementara el numero de intentos "nWrong"
    handleGuess(evt){
        let ltr = evt.target.value;
        this.setState( st => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + ( st.answer.includes(ltr) ? 0 : 1)
        }));
    }

    /* generateButtons : regresara un arreglo con los botones a renderizar / mostrar */
    generateButtons(){
        // con split dividimos la cadena del abecedario, con map iteramos sobre cada letra, creando un boton por cada letra
        return "abcdefghijklmnopqrstuvwxyz".split("").map( ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(ltr)} /* si guessed tiene la letra, deshabilitamos ese boton */
            >
                {ltr} {/* La letra a imprimir sobre el boton */}
            </button>
        ));
    }
    
    render(){
        const gameOver = this.state.nWrong >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
        let gameState = this.generateButtons();
        if(isWinner) gameState = "You win!";
        if(gameOver) gameState = "You lose!";
        return(
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrong]} alt={altText}/>
                <p>Guessed Wrong: {this.state.nWrong}</p>
                <p className='Hangman-word'>
                    {!gameOver ? this.guessedWord() : this.state.answer}
                </p>
                <p className='Hangman-btns'>
                    {gameState}
                </p>
                <button id="reset" onClick={this.reset}>Restart?</button>
            </div>
        );
    }

}

export default Hangman;