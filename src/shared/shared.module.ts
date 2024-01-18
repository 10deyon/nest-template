import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserService } from './services/users/user.service';
import { join } from 'path';
import config from 'src/core/config/config';

const CONFIG = config();

@Module({
  imports: [
    ConfigModule,
    // RepositoryModule,
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule], // import module if not enabled globally
    //   useFactory: async (config: ConfigService) => ({
    //     transport: {
    //       host: "sandbox.smtp.mailtrap.io",
    //       secure: false,
    //       auth: {
    //         user: "17e543a3e5f525",
    //         pass: "5f2793befbd972",
    //       },
    //     },
    //     defaults: {
    //       from: `"No Reply" <${CONFIG.MAIL_FROM}>`,
    //     },
    //     template: {
    //       dir: join(__dirname, '../templates'),
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],

  // exports: [UserService],

  // providers: [UserService],
})
export class SharedModule {}
