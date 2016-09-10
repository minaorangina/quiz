import { connect } from 'react-redux';
import EditQuiz from '../components/edit-quiz/edit-quiz';
import { addQuestion, deleteQuestion, updateValue, updateQuizName, updateQuiz, clearNewQuizState } from '../actions/new-quiz';
import { hashHistory } from 'react-router';




const mapStateToProps = (state) => ({
    questions: state.newQuiz.questions,
    isUpdatingQuiz: state.newQuiz.isUpdatingQuiz,
    name: state.newQuiz.name,
    deletedQuestions: state.newQuiz.deletedQuestions,
    username: state.user.username
});


const mapDispatchToProps = (dispatch) => ({

    handleAddQuestion: () => {
        dispatch(addQuestion());
    },

    handleDeleteQuestion: (index) => {
        dispatch(deleteQuestion(index));
    },

    handleInputChange: (inputType, value, index) => {
        dispatch(updateValue(inputType, value, index));
    },

    handleQuizNameChange: (value) => {
        dispatch(updateQuizName(value));
    },

    handleEditQuiz: (module_id, quiz_id, quizName, questions, deletedQuestions) => {
        dispatch(updateQuiz(module_id, quiz_id, quizName, questions, deletedQuestions));
        setTimeout(() => {
            hashHistory.goBack();
            dispatch(clearNewQuizState());
        }, 950);
    }
});

const EditQuizContainer = connect(mapStateToProps, mapDispatchToProps)(EditQuiz);

export default EditQuizContainer;
