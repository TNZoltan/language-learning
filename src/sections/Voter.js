import { useState } from "react"
import React from "react"
import { putVote } from "../services/api"
import styles from "./Voter.module.scss";
import cx from 'classnames';
import { Dislike, Like } from "grommet-icons";


const Voter = ({ type, submissionId, initObj, size = "large" }) => {
  const [approveCount, setApproveCount] = useState(initObj.approved)
  const [rejectCount, setRejectCount] = useState(initObj.rejected)
  const [userVote, setUserVote] = useState(initObj.userVote)

  const vote = (theVote) => {
    const previousVote = userVote
    putVote(type, submissionId, theVote).then(status => {
      if (status === 201 || status === 200 || status === 204) {
        setUserVote(theVote)
        if (previousVote !== undefined) {
          previousVote ? setApproveCount(prev => --prev) : setRejectCount(prev => --prev)
        }
        if (theVote !== undefined) {
          theVote ? setApproveCount(prev => ++prev) : setRejectCount(prev => ++prev)
        }
      }
    })
  }

  return (
    <div className={styles.voter}>
      <button className={cx(
        styles.voteButton,
        styles[size],
        { [styles.active]: userVote === true }
      )} onClick={(e) => {
        e.stopPropagation()
        userVote === true ? vote(undefined) : vote(true)
      }}>
        {size !== 'large' ? (
          <div className={styles.like}>
            <Like size="small" color={userVote === true ? 'green' : 'grey'} /> {approveCount || ''}
          </div>
        )
          : !approveCount ? 'Approve' : `${approveCount} approved`}
      </button>
      <button className={cx(
        styles.voteButton,
        styles[size],
        { [styles.active]: userVote === false }
      )} onClick={(e) => {
        e.stopPropagation()
        userVote === false ? vote(undefined) : vote(false)
      }}>
        {size !== 'large' ? (
          <div className={styles.like}>
            <Dislike size="small" color={userVote === false ? 'red' : 'grey'} /> {rejectCount || ''}
          </div>
        )
          : !rejectCount ? 'Reject' : `${rejectCount} rejected`}
      </button>
    </div>
  )
}

export default Voter