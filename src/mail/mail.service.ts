import { Inject, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendMail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append(
      'from',
      `mcGrid from Nuber Eats <mailgun@${this.options.domain}>`,
    );
    form.append('to', 'antnf3@naver.com');
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    try {
      const result = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      ).json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendMail('Verify Your Email', 'nuber-eat', [
      {
        key: 'code',
        value: code,
      },
      {
        key: 'username',
        value: email,
      },
    ]);
  }
}
