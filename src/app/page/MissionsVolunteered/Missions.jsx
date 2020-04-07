import React from "react";
import { useFirestore, firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Typography, Button, Grid, CircularProgress } from "@material-ui/core";
import styled from "styled-components";

import { Page, Card } from "../../layout";
import { User } from "../../model";
import { MissionCard } from "../../component";
import { compose } from "redux";

const StyledHeader = styled(Typography)`
  margin-top: 24px;
`;
const StyledButton = styled(Button)`
  margin-top: 24px;
  flex-grow: 1;
`;

const PlaceHolder = styled.div`
  width: 16px;
`;

const MissionsPage = ({ auth, history, firebase, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsVolunteered);
  const firestore = useFirestore();

  function volunteerForMission(missionId) {
    User.assignAsVolunteer(firestore, missionId, auth.uid);
  }

  if (missions === undefined) {
    return (
      <Grid container justify="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <Page template="pink">
      <StyledHeader variant="h1"> Missions </StyledHeader>
      {Array.isArray(missions) && missions.length === 0 ? <div>No missions</div> : ""}

      {missions.map((mission) => (
        <Card key={mission.id}>
          <MissionCard mission={mission} key={`preview-${mission.id}`} />

          <Grid container justify="center" alignItems="center">
            <StyledButton
              color="primary"
              size="large"
              variant="contained"
              disableElevation
              onClick={() => volunteerForMission(mission.id)}
            >
              Volunteer
            </StyledButton>
            <PlaceHolder />
            <StyledButton
              variant="outlined"
              size="large"
              color="secondary"
              onClick={() => {
                history.push(`/missions/${mission.id}`);
              }}
            >
              Details
            </StyledButton>
          </Grid>
        </Card>
      ))}
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "missions",
        where: [["volunteerId", "==", props.auth.uid]],
        storeAs: "missionsVolunteered",
      },
    ];
  })
)(withRouter(MissionsPage));

//export default withFirestore(MissionsPage);
