import { connect } from 'react-redux';
import { store } from '../../store';
import Result from '../../components/student-module/result';
import getNewTrophies from '../../lib/getNewTrophies';


const mapStateToProps = (state) => ({
    newTrophies: state.result.newTrophyState && getNewTrophies(store.getState().module.trophies_awarded, store.getState().result.newTrophyState),
    score: state.result.score
});

const StudentQuizResultContainer = connect(mapStateToProps)(Result);

export default StudentQuizResultContainer;
