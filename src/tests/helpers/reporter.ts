import { DisplayProcessor, StacktraceOption } from 'jasmine-spec-reporter'

/*-------------------------jasmine reporter issue solution---------------------------------- */
/*Since 3.0.0, jasmine-spec-reporter module exports SpecReporter and DisplayProcessor.
According to the documentation, you need to configure it like this:
https://stackoverflow.com/questions/43276445/specreporter-is-not-a-constructor-error-on-jasmine */
import SuiteInfo = jasmine.SuiteInfo
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

/*-------------------------------------------------------------------------*/
jasmine.getEnv().addReporter(new SpecReporter());
class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
)
