<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departments')->insert([
            ['name' => 'Accounting'],
            ['name' => 'Business Development'],
            ['name' => 'Engineering'],
            ['name' => 'HumanResources'],
            ['name' => 'Legal'],
            ['name' => 'Marketing'],
            ['name' => 'Product Management'],
            ['name' => 'Sales'],
            ['name' => 'Training'],
        ]);
    }
}
