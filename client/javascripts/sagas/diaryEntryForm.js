import { put, call, takeEvery } from 'redux-saga/effects';
import * as api from 'api';
import {
  POST_DIARY_ENTRY,
  postDiaryEntrySuccess,
  postDiaryEntryFailed,
  clearDiaryEntry,
} from 'actions/diaryEntryFormActionCreators';
import {
  addWarningFlashMessage,
  addSuccessFlashMessage,
  removeAllFlashMessages,
} from 'actions/flashMessagesActionCreators';
import { browserHistory } from 'react-router';

export function* handlePostDiaryEntry(action) {
  try {
    const payload = yield call(api.createDiaryEntry, action.payload);
    yield put(postDiaryEntrySuccess(payload));
    yield put(removeAllFlashMessages());
    yield put(addSuccessFlashMessage('成功しました'));
    yield put(clearDiaryEntry());
    browserHistory.push('/');
  } catch (error) {
    yield put(postDiaryEntryFailed(error));
    yield put(removeAllFlashMessages());
    yield error.response.data.errors.map(m => put(addWarningFlashMessage(m)));
  }
}

export default function* diarySaga() {
  yield takeEvery(POST_DIARY_ENTRY, handlePostDiaryEntry);
}
