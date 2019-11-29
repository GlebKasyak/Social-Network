import { sendMessageCreator } from "../../redux/dialogs/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";

const mapStateToProps = state => { return { dialogsPage: state.dialogsPage } };

const DialogsContainer = compose(
    connect(mapStateToProps, { sendMessageCreator }),
    WithAuthRedirect
)( Dialogs );

export default DialogsContainer;