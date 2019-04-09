import React, {Component, Fragment} from "react";
import { random } from "lodash";

import "./random-planet.css";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import SwapiService from "../../services/swapi-service"

const PlanetView = ({planet}) => {
    console.log("props_Planet", planet);
    const {
        id,
        name,
        population,
        rotationPeriod,
        diameter
    } = planet;
    return (
        <Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg `}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    )

}

export default class RandomPlanet extends Component {
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };


    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updatePlanet() {
        const id = random(1, 25);
        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updatePlanet()
    }


    render() {
        const {
            planet,
            loading,
            error
        } = this.state;

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner className="ng-scope"/> :  null;
        const content = !(loading || error) ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}


