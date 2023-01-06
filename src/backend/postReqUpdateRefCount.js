import { refCountDirections, supabase } from "./helpers/database"
import { logCustomError } from "./helpers/logging"

export const postReqUpdateRefCount = async (submissionType, direction, sentenceId) => {
  supabase.rpc(`${direction}_${submissionType}_ref_count`, { s_id: sentenceId }).then(data => {
    if (data.error) {
      logCustomError(data, `Error: ${direction} of ${submissionType} failed.`)
    }
    if (direction === refCountDirections.DOWN) {
      supabase.rpc(`clear_sentence_entity`).then(data => {
        if (data.error) {
          logCustomError(data, `Error: Clearing ID ${sentenceId} failed.`)
        }
      })
    }
  })
}
