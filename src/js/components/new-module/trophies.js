import React, { PropTypes } from 'react';
import classnames from 'classnames';
import normaliseText from '../../lib/normaliseText';
import text from '../../lib/newModuleRollovers.json';

class Trophies extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            trophies: false,
            participation: false,
            overall_average: false,
            high_score: false,
            first_quiz: false
        };
    }

    toggleRollover (text) {
        this.setState({
            [text]: !this.state[text]
        });
    }

    returnClassnames (text) {
        return classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state[text]
        });
    }

    render () {

        const toggleClassnamesTrophies = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.trophies
        });

        let mappedTrophies = this.props.trophies.trophy_name.map((name, i) => {

            return (
                <div className="new-module-medals columns" key={ i }>
                    <div className="column box is-info has-text-centered">
                        <label className="label module-section-headers">{ normaliseText(name) }</label>
                        <i onClick={ () => { this.toggleRollover(name);} } className="fa fa-question-circle help-icon" />
                        <div className={ this.returnClassnames(name) } >
                        <p>
                        { text.trophy.conditions[i] }
                        </p>
                        </div>
                        <div>
                            <input
                                   className="input"
                                   type="number"
                                   min="1"
                                   max="100"
                                   defaultValue={ this.props.trophies.condition[i] }
                                   onChange={ (e) => this.props.updateTrophyVals(name, e.target.value) } />
                        </div>
                    </div>
                </div>

            );
        });

        return (
            <div className="section column">
                <h3 className="module-section-headers">
                    <i className="fa fa-star" /> Trophies
                </h3>
                <i onClick={ () => { this.toggleRollover("trophies");} } className="fa fa-question-circle help-icon" />

                <div className={ toggleClassnamesTrophies }>
                    <p>
                        { text.trophy.trophies }
                    </p>
                </div>
                    { mappedTrophies }
            </div>
        );

    }
}

Trophies.propTypes = {
    trophies: PropTypes.object.isRequired,
    updateTrophyVals: PropTypes.func.isRequired
};

export default Trophies;
