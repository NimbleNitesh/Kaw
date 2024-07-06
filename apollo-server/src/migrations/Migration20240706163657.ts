import { Migration } from '@mikro-orm/migrations';

export class Migration20240706163657 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" text not null, "reactions" jsonb not null default \'{"funny":0,"love":0,"sad":0,"support":0,"idea":0}\', "creator_id" int not null);');

    this.addSql('alter table "post" add constraint "post_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post" cascade;');
  }

}
