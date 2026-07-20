import { useRoutes } from "react-router-dom";
import Menu from "../layouts/SideMenu";
import LoginPage from "../pages/AuthPage/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import CommissionerCandidateViewPage from "../pages/Candidate/CommissionerCandidateViewPage";
import DirectorCandidateViewPage from "../pages/Candidate/DirectorCandidateViewPage";
import VotingProcedureViewPage from "../pages/VotingProcedure/VotingProcedureViewPage";
import VoteSendViewPage from "../pages/VoteSend/VoteSendViewPage";
import HistoryVoteViewPage from "../pages/HistoryVote/HistoryVoteViewPage";
import VoteDataPage from "../pages/VoteManage/VoteDataPage";
import HistoryVoteViewByIdPage from "../pages/HistoryVote/HistoryVoteViewByIdPage";
//user manage page
import UserDataPage from "../pages/UserManage/UserDataPage";
import UserDataViewByIdPage from "../pages/UserManage/UserDataViewByIdPage";
import UserDataEditPage from "../pages/UserManage/UserDataEditPage";
import UserPrivilegeDataEditPage from "../pages/UserManage/UserPrivilegeDataEditPage";
import ResetPasswordPage from "../pages/AuthPage/ResetPasswordPage";

//profile
import CommissionerProfileViewPage from "../pages/Profile/CommissionerProfileViewPage";
import DirectorProfileViewPage from "../pages/Profile/DirectorProfileViewPage";
import UserDataCreatePage from "../pages/UserManage/UserDataCreatePage";

//voting period
import VotingPeriodDataTablePage from "../pages/VotingPeriod/VotingPeriodDataTablePage";
import VotingPeriodDataCreatePage from "../pages/VotingPeriod/VotingPeriodDataCreatePage";
import VotingPeriodDataViewByIdPage from "../pages/VotingPeriod/VotingPeriodDataViewByIdPage";
import VotingPeriodDataEditPage from "../pages/VotingPeriod/VotingPeriodDataEditPage";

//commissioner
import CommissionerCandidateDataTablePage from "../pages/CommissionerCandidate/CommissionerCandidateDataTablePage";
import CommissionerCandidateDataViewByIdPage from "../pages/CommissionerCandidate/CommissionerCandidateDataViewByIdPage";
import CommissionerCandidateDataCreatePage from "../pages/CommissionerCandidate/CommissionerCandidateDataCreatePage";
import CommissionerCandidateDataEditPage from "../pages/CommissionerCandidate/CommissionerCandidateDataEditPage";

//director
import DirectorCandidateDataTablePage from "../pages/DirectorCandidate/DirectorCandidateDataTablePage";
import DirectorCandidateDataViewByIdPage from "../pages/DirectorCandidate/DirectorCandidateDataViewByIdPage";
import DirectorCandidateDataCreatePage from "../pages/DirectorCandidate/DirectorCandidateDataCreatePage";
import DirectorCandidateDataEditPage from "../pages/DirectorCandidate/DirectorCandidateDataEditPage";

//slider
import SliderDataTablePage from "../pages/Slider/SliderDataTablePage";
import SliderDataViewByIdPage from "../pages/Slider/SliderDataViewByIdPage";
import SliderDataCreatePage from "../pages/Slider/SliderDataCreatePage";
import SliderDataEditPage from "../pages/Slider/SliderDataEditPage";

//company
import CompanyDataTablePage from "../pages/Company/CompanyDataTablePage";
import CompanyDataViewByIdPage from "../pages/Company/CompanyDataViewByIdPage";
import CompanyDataCreatePage from "../pages/Company/CompanyDataCreatePage";
import CompanyDataEditPage from "../pages/Company/CompanyDataEditPage";

//status
import StatusDataTablePage from "../pages/Status/StatusDataTablePage";
import StatusDataViewByIdPage from "../pages/Status/StatusDataViewByIdPage";
import StatusDataCreatePage from "../pages/Status/StatusDataCreatePage";
import StatusDataEditPage from "../pages/Status/StatusDataEditPage";

//application
import ApplicationDataTablePage from "../pages/Application/ApplicationDataTablePage";
import ApplicationDataViewByIdPage from "../pages/Application/ApplicationDataViewByIdPage";
import ApplicationDataCreatePage from "../pages/Application/ApplicationDataCreatePage";
import ApplicationDataEditPage from "../pages/Application/ApplicationDataEditPage";

//application
import AuditLogDataTablePage from "../pages/AuditLog/AuditLogDataTablePage";
import AuditLogDataViewByIdPage from "../pages/AuditLog/AuditLogDataViewByIdPage";
import AuditLogDataCreatePage from "../pages/AuditLog/AuditLogDataCreatePage";
import AuditLogDataEditPage from "../pages/AuditLog/AuditLogDataEditPage";
function Router() {
  const routes = [
    {
      path: "/",
      element: <Menu />,
      children: [
        {
          path: "/",
          element: <VotingProcedureViewPage />,
        },
        {
          path: "/commissioner_profile",
          element: <CommissionerProfileViewPage />,
        },
        {
          path: "/director_profile",
          element: <DirectorProfileViewPage />,
        },
        {
          path: "/commissioner_candidate",
          element: <CommissionerCandidateViewPage />,
        },
        {
          path: "/director_candidate",
          element: <DirectorCandidateViewPage />,
        },
        {
          path: "/history_vote",
          element: <HistoryVoteViewPage />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/users",
          element: <UserDataPage />,
        },
        {
          path: "/user_create",
          element: <UserDataCreatePage />,
        },
        {
          path: "/user/:id",
          element: <UserDataViewByIdPage />,
        },
        {
          path: "/user/:id/edit",
          element: <UserDataEditPage />,
        },
        {
          path: "/user/:user_id/:privilege_id/edit_privilege",
          element: <UserPrivilegeDataEditPage />,
        },
        {
          path: "/vote_data",
          element: <VoteDataPage />,
        },
        {
          path: "/vote_send",
          element: <VoteSendViewPage />,
        },
        {
          path: "/vote_data/:id",
          element: <HistoryVoteViewByIdPage />,
        },
        //voting_period
        {
          path: "/voting_period",
          element: <VotingPeriodDataTablePage />,
        },
        {
          path: "/voting_period/create",
          element: <VotingPeriodDataCreatePage />,
        },
        {
          path: "/voting_period/data/:id",
          element: <VotingPeriodDataViewByIdPage />,
        },
        {
          path: "/voting_period/data/:id/edit",
          element: <VotingPeriodDataEditPage />,
        },

        // CommissionerCandidateDataTablePage
        {
          path: "/commissioner_candidate_setup",
          element: <CommissionerCandidateDataTablePage />,
        },
        {
          path: "/commissioner_candidate_setup/data/:id",
          element: <CommissionerCandidateDataViewByIdPage />,
        },
        {
          path: "/commissioner_candidate_setup/create",
          element: <CommissionerCandidateDataCreatePage />,
        },
        {
          path: "/commissioner_candidate_setup/data/:id/edit",
          element: <CommissionerCandidateDataEditPage />,
        },

        //DirectorCandidate
        {
          path: "/director_candidate_setup",
          element: <DirectorCandidateDataTablePage />,
        },
        {
          path: "/director_candidate_setup/data/:id",
          element: <DirectorCandidateDataViewByIdPage />,
        },
        {
          path: "/director_candidate_setup/create",
          element: <DirectorCandidateDataCreatePage />,
        },
        {
          path: "/director_candidate_setup/data/:id/edit",
          element: <DirectorCandidateDataEditPage />,
        },

        //Slider
        {
          path: "/slider",
          element: <SliderDataTablePage />,
        },
        {
          path: "/slider/data/:id",
          element: <SliderDataViewByIdPage />,
        },
        {
          path: "/slider/create",
          element: <SliderDataCreatePage />,
        },
        {
          path: "/slider/data/:id/edit",
          element: <SliderDataEditPage />,
        },

        //Company
        {
          path: "/company",
          element: <CompanyDataTablePage />,
        },
        {
          path: "/company/data/:id",
          element: <CompanyDataViewByIdPage />,
        },
        {
          path: "/company/create",
          element: <CompanyDataCreatePage />,
        },
        {
          path: "/company/data/:id/edit",
          element: <CompanyDataEditPage />,
        },

        //Status
        {
          path: "/status",
          element: <StatusDataTablePage />,
        },
        {
          path: "/status/data/:id",
          element: <StatusDataViewByIdPage />,
        },
        {
          path: "/status/create",
          element: <StatusDataCreatePage />,
        },
        {
          path: "/status/data/:id/edit",
          element: <StatusDataEditPage />,
        },
        //Application
        {
          path: "/application",
          element: <ApplicationDataTablePage />,
        },
        {
          path: "/application/data/:id",
          element: <ApplicationDataViewByIdPage />,
        },
        {
          path: "/application/create",
          element: <ApplicationDataCreatePage />,
        },
        {
          path: "/application/data/:id/edit",
          element: <ApplicationDataEditPage />,
        },

        //audit_log
        {
          path: "/audit_log",
          element: <AuditLogDataTablePage />,
        },
        {
          path: "/audit_log/data/:id",
          element: <AuditLogDataViewByIdPage />,
        },
        {
          path: "/audit_log/create",
          element: <AuditLogDataCreatePage />,
        },
        {
          path: "/audit_log/data/:id/edit",
          element: <AuditLogDataEditPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    // {
    //   path: "/registration",
    //   element: <RegistrationPage />,
    // },
    // {
    //   path: "/req_reset",
    //   element: <RequestResetPasswordPage />,
    // },
    // {
    //   path: "/reset/:token",
    //   element: <ResetPasswordPage />,
    // },
    // {
    //   path: "/error-page",
    //   element: <ErrorPage />,
    // },
  ];

  return useRoutes(routes);
}

export default Router;
