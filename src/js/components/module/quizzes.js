import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const Quizzes = ({ location, quizzes, sendQuizInvite, module_id }) => {

    const desktopView = quizzes.map((quiz, index) => {

        let iconClasses = classnames("fa", {
            "fa-check": quiz.is_presented === true,
            "fa-times": quiz.is_presented === false
        });

        let is_last_quizClasses = classnames("fa", {
            "fa-check": quiz.is_last_quiz
        });

        let buttonClass = classnames("tag is-success is-medium invite-students-tag", {
            "display-none": quiz.is_presented
        });

        let quizHistoryClass = classnames("tag is-warning is-medium settings-tag", {
            "display-none": !quiz.is_presented
        });

        let editQuizClass = classnames("tag is-warning is-medium settings-tag", {
            "display-none": quiz.is_presented
        });

        return (
            <tr key={ index }>
                <td>{ quiz.name }</td>
                <td>{+quiz.num_questions}</td>
                <td>{+quiz.num_entries}</td>
                <td><i className={ iconClasses } /></td>
                <td><i className={ is_last_quizClasses } /></td>
                <td>
                    <Link to={`${module_id}/${quiz.quiz_id}/edit-quiz`}>
                        <span title="Edit Quiz" className={ editQuizClass }>
                            <i className="fa fa-edit"></i>
                        </span>
                    </Link>

                    <Link to={ `${module_id}/${quiz.quiz_id}/members` }>
                        <span title="Quiz History" className={ quizHistoryClass }>
                            <i className="fa fa-history"></i>
                        </span>
                    </Link>
                </td>
                <td>
                    <Link to={`${location.pathname}/live`}>
                        <span className={ buttonClass }
                            onClick={ () => sendQuizInvite(quiz.quiz_id, quiz.name) }>
                            Invite students to quiz
                        </span>
                    </Link>
                </td>
            </tr>
        );
    });

    const mobileView = quizzes.map((quiz, index) => {

        let iconClasses = classnames("fa", {
            "fa-check": quiz.is_presented === true,
            "fa-times": quiz.is_presented === false
        });

        let quizHistoryClass = classnames("settings-link-element", {
            "display-none": !quiz.is_presented
        });

        let editQuizClass = classnames("settings-link-element", {
            "display-none": quiz.is_presented
        });

        let is_last_quizClasses = classnames("fa", {
            "fa-check": quiz.is_last_quiz
        });


        return (
            <div key={ index } className="box">
                <h5>{ quiz.name }</h5>
                <div className="columns is-mobile has-text-centered">
                    <div className="column">{`Questions: \n${+quiz.num_questions}`}</div>
                    <div className="column">{`Entries: \n${+quiz.num_entries}`}</div>
                </div>
                <div className="columns is-mobile has-text-centered">
                    <div className="column">Presented: <i className={ iconClasses } /></div>
                    <div className="column">Last Quiz: <i className={ is_last_quizClasses } /></div>
                </div>
                <div className="columns is-mobile has-text-centered">
                    <Link className={ editQuizClass } to={`${module_id}/${quiz.quiz_id}/edit-quiz`}>
                        <span title="Edit Quiz" className="column tag is-warning is-medium settings-tag">
                            <i className="fa fa-edit"></i>
                        </span>
                    </Link>

                    <Link className={ quizHistoryClass } to={ `${module_id}/${quiz.quiz_id}/members` }>
                        <span title="Quiz History" className="column tag is-warning is-medium settings-tag">
                            <i className="fa fa-history"></i>
                        </span>
                    </Link>
                </div>

            </div>
        );
    });

    return (
        <div className="section quizzes">
            <div className="level">
                <div className="level-left">
                    <h3 className="level-item">Quizzes</h3>
                </div>
                <div className="level-right">

                    <Link className="level-item" to={ `${module_id}/new-quiz` } >

                        <button className="add-quiz-button button is-info">
                            <span className="icon">
                                <i className="fa fa-plus" />
                            </span>
                            <span>Add a new quiz</span>
                        </button>
                    </Link>
                </div>
            </div>

            <table className="table is-hidden-mobile">
                <thead>
                    <tr>
                        <th>Quiz name</th>
                        <th># questions</th>
                        <th># entries</th>
                        <th>Presented?</th>
                        <th>Last Quiz</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { desktopView }
                </tbody>
            </table>

            <div className="is-hidden-tablet">
                { mobileView }
            </div>
        </div>
    );
};

Quizzes.propTypes = {
    location: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired,
    sendQuizInvite: PropTypes.func.isRequired,
    module_id: PropTypes.string.isRequired
};

export default Quizzes;
