import { Observable, concat, interval, of } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

export class RxjsUtil {

  static generateNumbersOverTime(_: {
    initialValue?: number,
    intervalMs: number,
    limit: number
  }): Observable<number> {
    let i = _.initialValue || 0;
    return concat(
      of(i),
      interval(_.intervalMs).pipe(
        map(v => v + 1 + i)
      )
    ).pipe(
      takeWhile(v => v <= _.limit)
    );
  }
}
