import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import sideMenuReducer from "./sideMenuSlice";
import AuthReducer from "./features/AuthSlice";
import GetMeReducer from "./features/GetMeSlice";
import UserReducer from "./features/UserSlice";
import PrivilegeReducer from "./features/PrivilegeSlice";
import DirectorCandidateReducer from "./features/DirectorCandidateSlice";
import VotingPeriodReducer from "./features/VotingPeriodSlice";
import StatusVotingReducer from "./features/StatusVotingSlice";
import CommissionerCandidateReducer from "./features/CommissionerCandidateSlice";
import CommissionerVoteReducer from "./features/CommissionerVoteSlice";
import DirectorVoteReducer from "./features/DirectorVoteSlice";
import SliderReducer from "./features/SliderSlice";
import CompanyReducer from "./features/CompanySlice";
import StatusReducer from "./features/StatusSlice";
import ApplicationReducer from "./features/ApplicationSlice";
import AuditLogReducer from "./features/AuditLogSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    auth: AuthReducer,
    getMe: GetMeReducer,
    user: UserReducer,
    privilege: PrivilegeReducer,
    directorCandidate: DirectorCandidateReducer,
    commissionerCandidate: CommissionerCandidateReducer,
    commissionerVote: CommissionerVoteReducer,
    directorVote: DirectorVoteReducer,
    votingPeriod: VotingPeriodReducer,
    statusVoting: StatusVotingReducer,
    slider: SliderReducer,
    company: CompanyReducer,
    status: StatusReducer,
    application: ApplicationReducer,
    auditLog: AuditLogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
