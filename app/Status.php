<?php

namespace App;

enum Status: string
{
    case Pending = 'P';
    case Rejected = 'R';
    case Accepted = 'A';
}
