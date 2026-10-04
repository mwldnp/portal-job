<?php

use App\Models\Department;
use App\Models\User;

test('an authenticated user can create a vacancy', function () {
    $user = User::factory()->create();
    $department = Department::create(['name' => 'Accounting']);

    $response = $this->actingAs($user)->post(route('vacancy.store'), [
        'dept_id' => $department->id,
        'position' => 'Staff Accountant',
        'quota' => 2,
        'description' => 'Manage accounting records.',
        'user_create' => $user->name,
        'user_update' => $user->name,
    ]);

    $response->assertRedirect(route('vacancy.index'));
    $this->assertDatabaseHas('vacancies', [
        'dept_id' => $department->id,
        'position' => 'Staff Accountant',
        'quota' => 2,
    ]);
});

test('a vacancy with an invalid quota is rejected', function () {
    $user = User::factory()->create();
    $department = Department::create(['name' => 'Accounting']);

    $response = $this->actingAs($user)->post(route('vacancy.store'), [
        'dept_id' => $department->id,
        'position' => 'Staff Accountant',
        'quota' => 0,
        'description' => 'Manage accounting records.',
        'user_create' => $user->name,
        'user_update' => $user->name,
    ]);

    $response->assertSessionHasErrors('quota');
    $this->assertDatabaseCount('vacancies', 0);
});
