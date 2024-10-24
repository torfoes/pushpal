# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_10_22_221138) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "attendances", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "membership_id", null: false
    t.uuid "event_id", null: false
    t.datetime "time"
    t.boolean "rsvp_status", default: false
    t.boolean "checkin_status", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "rsvp_time"
    t.index ["event_id"], name: "index_attendances_on_event_id"
    t.index ["membership_id"], name: "index_attendances_on_membership_id"
  end

  create_table "dues", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "membership_id", null: false
    t.date "date"
    t.float "amount"
    t.string "payment_id"
    t.integer "status", default: 0
    t.uuid "organization_id", null: false
    t.string "semester"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["membership_id"], name: "index_dues_on_membership_id"
    t.index ["organization_id"], name: "index_dues_on_organization_id"
  end

  create_table "events", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "creator_membership_id", null: false
    t.string "name"
    t.text "description"
    t.uuid "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "attendance_required", default: false
    t.datetime "start_time"
    t.integer "duration"
    t.index ["creator_membership_id"], name: "index_events_on_creator_membership_id"
    t.index ["organization_id"], name: "index_events_on_organization_id"
  end

  create_table "memberships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "organization_id", null: false
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "dues_paid", default: false
    t.index ["organization_id"], name: "index_memberships_on_organization_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "notifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "creator_membership_id", null: false
    t.integer "send_type", default: 0, null: false
    t.string "title", null: false
    t.text "message", null: false
    t.datetime "sent_at"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "organization_id", null: false
    t.index ["creator_membership_id"], name: "index_notifications_on_creator_membership_id"
    t.index ["organization_id"], name: "index_notifications_on_organization_id"
  end

  create_table "organizations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "push_subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "endpoint", null: false
    t.string "auth_key", null: false
    t.string "p256dh_key", null: false
    t.text "device_info"
    t.boolean "is_bot"
    t.string "browser_name"
    t.string "browser_version"
    t.string "device_model"
    t.string "device_type"
    t.string "device_vendor"
    t.string "engine_name"
    t.string "engine_version"
    t.string "os_name"
    t.string "os_version"
    t.string "cpu_architecture"
    t.string "user_agent"
    t.datetime "last_used_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint"], name: "index_push_subscriptions_on_endpoint", unique: true
    t.index ["user_id"], name: "index_push_subscriptions_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "name"
    t.string "phone_number"
    t.string "picture"
    t.string "uin"
    t.string "sub"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "attendances", "events"
  add_foreign_key "attendances", "memberships"
  add_foreign_key "dues", "memberships"
  add_foreign_key "dues", "organizations"
  add_foreign_key "events", "memberships", column: "creator_membership_id"
  add_foreign_key "events", "organizations"
  add_foreign_key "memberships", "organizations"
  add_foreign_key "memberships", "users"
  add_foreign_key "notifications", "memberships", column: "creator_membership_id", on_delete: :cascade
  add_foreign_key "notifications", "organizations"
  add_foreign_key "push_subscriptions", "users"
end
