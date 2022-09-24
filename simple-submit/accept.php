<?php

assert(!empty($_POST));
assert($_POST['fname'] === 'hogehoge');
assert($_POST['lname'] === 'hogehoge');
assert($_POST['hval1'] === 'hogehoge');
