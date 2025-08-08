<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('guard_name')->default('web');
            $table->timestamps();

            $table->index('name');
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('guard_name')->default('web');
            $table->timestamps();

            $table->index('name');
        });

        Schema::create('model_has_permissions', function (Blueprint $table) {
            $table->id();
            $table->string('permission_id');
            $table->string('model_type');
            $table->unsignedBigInteger('model_id');
            $table->timestamps();

            $table->index(['model_id', 'model_type']);
        });

        Schema::create('model_has_roles', function (Blueprint $table) {
            $table->id();
            $table->string('role_id');
            $table->string('model_type');
            $table->unsignedBigInteger('model_id');
            $table->timestamps();

            $table->index(['model_id', 'model_type']);
        });

        Schema::create('role_has_permissions', function (Blueprint $table) {
            $table->id();
            $table->string('permission_id');
            $table->string('role_id');
            $table->timestamps();

            $table->index(['role_id', 'permission_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_has_permissions');
        Schema::dropIfExists('model_has_roles');
        Schema::dropIfExists('model_has_permissions');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('permissions');
    }
};