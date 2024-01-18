import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  // context is the request, while the next is the endpoint we are going to reach
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('THIS IS INTERCEPTING THE REQUEST');

    return next.handle().pipe(
      map((data) => {
        console.log('THIS IS INTERCEPTING THE RESPONSE');
        // from here you can intercept and manipulate the data response you get
        return data;
      }),
    );

    // NB: Data is the data you get back from the endpoint
  }
}
