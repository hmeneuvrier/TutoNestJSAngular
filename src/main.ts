import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import { getDbConnectionOptions, runDbMigrations } from '@shared/utils';

 
const port = process.env.PORT;

async function bootstrap() {
	 
	/**
	* Run DB migrations
	*/
	await runDbMigrations('development');
	const app = await NestFactory.create(AppModule.forRoot(await
		getDbConnectionOptions(process.env.NODE_ENV)),
	);
  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();

