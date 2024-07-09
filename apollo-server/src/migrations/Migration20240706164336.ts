import { Migration } from '@mikro-orm/migrations';

export class Migration20240706164336 extends Migration {

  async up(): Promise<void> {
    this.addSql(`
insert into post (title, creator_id, created_at, updated_at) values ('In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1, '5/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 1, '1/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '3/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 1, '1/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 1, '5/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1, '4/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, '4/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, '2/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1, '2/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '4/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 1, '3/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 1, '4/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, '2/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '1/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 1, '3/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 1, '1/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 1, '5/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 1, '3/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '5/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 1, '5/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1, '2/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Fusce consequat. Nulla nisl. Nunc nisl.', 1, '5/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1, '5/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 1, '4/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 1, '3/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '4/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 1, '3/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 1, '3/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '2/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, '4/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, '5/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 1, '2/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, '3/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '4/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 1, '4/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 1, '5/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, '2/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, '1/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '5/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In congue. Etiam justo. Etiam pretium iaculis justo.', 1, '5/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '1/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1, '2/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 1, '3/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 1, '2/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1, '1/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 1, '2/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 1, '5/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1, '1/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, '4/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 1, '3/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In congue. Etiam justo. Etiam pretium iaculis justo.', 1, '3/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 1, '3/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '2/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 1, '2/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, '2/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 1, '3/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 1, '3/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 1, '5/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1, '3/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '5/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 1, '4/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '4/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 1, '3/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In congue. Etiam justo. Etiam pretium iaculis justo.', 1, '3/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1, '3/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 1, '5/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 1, '2/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 1, '4/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '4/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 1, '3/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 1, '4/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 1, '1/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '4/7/2024', '1/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '5/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 1, '5/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1, '2/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, '3/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 1, '1/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '2/7/2024', '4/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 1, '2/7/2024', '3/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '4/7/2024', '5/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '3/7/2024', '2/7/2024');
insert into post (title, creator_id, created_at, updated_at) values ('Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '5/7/2024', '1/7/2024');
 
`);
  }

}