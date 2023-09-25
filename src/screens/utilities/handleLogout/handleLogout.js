import {logoutUser} from '../../../features/auth/login/loginSlice';
import { resetBilling } from '../../../features/slices/billing/getBillingHistory';
import { resetConversation } from '../../../features/slices/chat/conversation';
import { resetSubscripton } from '../../../features/slices/subscription/getSubscription';


export const handleLogOut = dispatch => {
  dispatch(resetConversation())
  dispatch(resetSubscripton());
  dispatch(resetBilling());
  dispatch(resetConversation());
  dispatch(logoutUser());
};
