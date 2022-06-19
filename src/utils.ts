import {
  BehaviorSubject,
  defer,
  filter,
  interval,
  map,
  share,
  withLatestFrom,
} from 'rxjs';

export const createPausableTimer = (pause: BehaviorSubject<boolean>) => {
  return defer(() => {
    let seconds = 1;
    return interval(1000).pipe(
      withLatestFrom(pause),
      filter(([, paused]) => !paused),
      map(() => seconds++)
    );
  }).pipe(share());
};
