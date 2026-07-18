const {
  user: userModel,
  voting_period: votingPeriodModel,
  commissioner_candidate: commissionerCandidateModel,
  director_candidate: directorCandidateModel,
  commissioner_vote: commissionerVoteModel,
  director_vote: directorVoteModel,
} = require("../models");
const CustomHttpError = require("../utils/custom_http_error.js");

const voteSecurity = async (req, res, next) => {
  const { user_uuid, voting_period_uuid } = req.params;

  const findUser = await userModel.findOne({
    where: {
      uuid: user_uuid,
    },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: {
      uuid: voting_period_uuid,
    },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  req.user_id = findUser.id;
  req.vote_period_id = findVotingPeriod.id;

  next();
};

const voteCommissionerCheckBeforeSubmit = async (req, res, next) => {
  const { voting_period_uuid, user_uuid, commissioner_candidate_uuid } =
    req.body;

  if (!voting_period_uuid || !user_uuid || !commissioner_candidate_uuid) {
    throw new CustomHttpError("vote not valid", 400);
  }

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: { uuid: voting_period_uuid },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  const findUser = await userModel.findOne({
    where: { uuid: user_uuid },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  const findCommissionerCandidate = await commissionerCandidateModel.findOne({
    where: { uuid: commissioner_candidate_uuid },
  });

  if (!findCommissionerCandidate) {
    throw new CustomHttpError("commissioner candidate not found", 404);
  }

  const findDataVote = await commissionerVoteModel.findAll({
    where: {
      voting_period_id: findVotingPeriod.id,
      user_id: findUser.id,
    },
  });

  if (findDataVote.length !== 0) {
    throw new CustomHttpError("you have vote record in this period", 403);
  }

  req.user_id = findUser.id;
  req.user_name = findUser.name;
  req.voting_period_id = findVotingPeriod.id;
  req.commissioner_candidate_id = findCommissionerCandidate.id;
  req.commissioner_candidate_name = findCommissionerCandidate.name;

  next();
};

const voteDirectorCheckBeforeSubmit = async (req, res, next) => {
  const { voting_period_uuid, user_uuid, director_candidate_uuid } = req.body;

  if (!voting_period_uuid || !user_uuid || !director_candidate_uuid) {
    throw new CustomHttpError("vote not valid", 400);
  }

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: { uuid: voting_period_uuid },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  const findUser = await userModel.findOne({
    where: { uuid: user_uuid },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  const findDirectorCandidate = await directorCandidateModel.findOne({
    where: { uuid: director_candidate_uuid },
  });

  if (!findDirectorCandidate) {
    throw new CustomHttpError("director candidate not found", 404);
  }

  const findDataVote = await directorVoteModel.findAll({
    where: {
      voting_period_id: findVotingPeriod.id,
      user_id: findUser.id,
    },
  });

  if (findDataVote.length !== 0) {
    throw new CustomHttpError("you have vote record in this period", 403);
  }

  req.user_id = findUser.id;
  req.user_name = findUser.name;
  req.voting_period_id = findVotingPeriod.id;
  req.director_candidate_id = findDirectorCandidate.id;
  req.director_candidate_name = findDirectorCandidate.name;

  next();
};

module.exports = {
  voteSecurity,
  voteCommissionerCheckBeforeSubmit,
  voteDirectorCheckBeforeSubmit,
};
